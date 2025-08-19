using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace Business.Mensajeria.Implements
{
    public class ServiceEmail : IServiceEmail
    {
        private readonly IConfiguration _config;
        public ServiceEmail(IConfiguration configuration)
        {
            _config = configuration;
        }
        public async Task EnviarEmailBienvenida(string emailReceptor)
        {
            var emailEmisor = _config.GetValue<string>("CONFIGURACIONES_EMAIL:EMAIL");
            var password = _config.GetValue<string>("CONFIGURACIONES_EMAIL:PASSWORD");
            var host = _config.GetValue<string>("CONFIGURACIONES_EMAIL:HOST");
            var puerto = _config.GetValue<int>("CONFIGURACIONES_EMAIL:PUERTO");

            var smtpCliente = new SmtpClient(host, puerto)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(emailEmisor, password)
            };

            string asunto = "¡Bienvenido a nuestro sistema!";
            string cuerpoHtml = @"
                                <div style='font-family: ""Segoe UI"", Roboto, sans-serif; padding: 40px 20px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);'>
                                    <div style='max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.1);'>
                                        <div style='text-align: center; margin-bottom: 30px;'>
                                            <h1 style='color: #434343; font-weight: 600; margin-bottom: 10px;'>¡Bienvenido a Nuestra Plataforma!</h1>
                                            <div style='height: 3px; width: 80px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); margin: 0 auto;'></div>
                                        </div>
                                        <div style='color: #666; line-height: 1.6; font-size: 16px;'>
                                            <p>Estamos emocionados de que formes parte de nuestra comunidad. Ahora puedes acceder a todos nuestros servicios.</p>
                                            <p style='margin-top: 25px;'>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                                        </div>
                                        <div style='margin-top: 40px; text-align: center;'>
                                            <a href='#' style='background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 35px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: 500; letter-spacing: 0.5px;'>Explorar</a>
                                        </div>
                                    </div>
                                </div>";

            var mensaje = new MailMessage(emailEmisor, emailReceptor, asunto, cuerpoHtml)
            {
                IsBodyHtml = true
            };

            await smtpCliente.SendMailAsync(mensaje);
        }
    }
}
