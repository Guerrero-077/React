using Business.Interfaces.IBusinessImplements;
using Business.Interfaces.IJWT;
using Business.Mensajeria;
using Business.Mensajeria.Interfaces;
using Entity.DTOs.Default;
using Entity.Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;
using Utilities.Custom;
using Utilities.Exceptions;
namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]

    public class LoginController : ControllerBase
    {


        private readonly IToken _token;
        private readonly IUserService _userService;
        private readonly ILogger<LoginController> _logger;
        private readonly EncriptePassword _utilities;
        private readonly IServiceEmail _serviceEmail;
        private readonly INotifyManager _notifyManager;

        public LoginController(EncriptePassword utilities,IToken token, ILogger<LoginController> logger, IUserService userService, ApplicationDbContext context, EncriptePassword utilidades, IServiceEmail serviceEmail, INotifyManager notifyManager)
        {
            _token = token;
            _userService = userService;
            _logger = logger;
            _utilities = utilities;
            _serviceEmail = serviceEmail;
            _notifyManager = notifyManager;
        }

        [HttpPost]
        [Route("Registrarse")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Registrarse(UserDto objeto)
        {
            try
            {
                var userCreated = await _userService.CreateAsyncUser(objeto);

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { isSuccess = false, message = ex.Message });
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            try
            {
                var token = await _token.GenerateToken(login);

                //await _serviceEmail.EnviarEmailBienvenida(login.email);
                //await _notifyManager.NotifyAsync();

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token });

                //return Ok(token);
            }
            catch (ValidationException ex)
            {
                _logger.LogWarning(ex, "Validación fallida para el inicio de sesión");
                return BadRequest(new { message = ex.Message });
            }
            catch (ExternalServiceException ex)
            {
                _logger.LogError(ex, "Error al crear el token");
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("ValidarToken")]
        public IActionResult ValidarToken([FromQuery] string token)

        {

            bool respuesta = _token.validarToken(token);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });

        }



        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenDto tokenDto)
        {
            // 1. Validar el token recibido de Google
            var payload = await _token.VerifyGoogleToken(tokenDto.TokenId);

            // 2. Si el token no es válido, rechazar el acceso
            if (payload == null)
                return Unauthorized("Token inválido de Google");

            // 3. Buscar o crear un usuario en la base de datos con el email recibido en el token de Google
            var user = await _userService.createUserGoogle(payload.Email, payload.Name);

            // 4. Obtener los roles asociados a ese usuario
            //var roles = await _token.GetRolesByUserId(user.Id);
            //var permissions = await _rolUserResvice.GetPermissionsByUserId(user.Id);

            var login = new LoginDto
            {
                email = user.email,
                password = user.password,
            };
            // 5. Generar un JWT del sistema con los datos del usuario y sus roles
            var token = await _token.GenerateToken(login);

            // 6. Retornar el token generado para que el frontend lo use en sesiones autenticadas
            return Ok(new { token });
        }

    }
}
