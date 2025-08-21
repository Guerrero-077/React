using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "forms",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    name = table.Column<string>(type: "varchar(100)", nullable: false),
                    description = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_forms", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "modules",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    name = table.Column<string>(type: "varchar(100)", nullable: false),
                    description = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_modules", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "permissions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    name = table.Column<string>(type: "varchar(100)", nullable: false),
                    description = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_permissions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "persons",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "varchar(100)", nullable: true),
                    lastName = table.Column<string>(type: "varchar(100)", nullable: true),
                    phoneNumber = table.Column<string>(type: "varchar(20)", nullable: true),
                    address = table.Column<string>(type: "varchar(100)", nullable: true),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_persons", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "rols",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    name = table.Column<string>(type: "varchar(100)", nullable: false),
                    description = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rols", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "form_modules",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    formid = table.Column<int>(type: "int", nullable: false),
                    moduleid = table.Column<int>(type: "int", nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_form_modules", x => x.id);
                    table.ForeignKey(
                        name: "FK_form_modules_forms_formid",
                        column: x => x.formid,
                        principalTable: "forms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_form_modules_modules_moduleid",
                        column: x => x.moduleid,
                        principalTable: "modules",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "varchar(100)", nullable: false),
                    password = table.Column<string>(type: "varchar(100)", nullable: true),
                    email = table.Column<string>(type: "varchar(150)", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: true),
                    normalized_email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true, computedColumnSql: "LOWER([email])", stored: true),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                    table.ForeignKey(
                        name: "FK_users_persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "persons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "rol_form_permissions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolid = table.Column<int>(type: "int", nullable: false),
                    formid = table.Column<int>(type: "int", nullable: false),
                    permissionid = table.Column<int>(type: "int", nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rol_form_permissions", x => x.id);
                    table.ForeignKey(
                        name: "FK_rol_form_permissions_forms_formid",
                        column: x => x.formid,
                        principalTable: "forms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_rol_form_permissions_permissions_permissionid",
                        column: x => x.permissionid,
                        principalTable: "permissions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_rol_form_permissions_rols_rolid",
                        column: x => x.rolid,
                        principalTable: "rols",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "rolUsers",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(type: "int", nullable: false),
                    rolId = table.Column<int>(type: "int", nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    is_deleted = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rolUsers", x => x.id);
                    table.ForeignKey(
                        name: "FK_rolUsers_rols_rolId",
                        column: x => x.rolId,
                        principalTable: "rols",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_rolUsers_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "forms",
                columns: new[] { "id", "active", "created_date", "description", "is_deleted", "name" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Form Update User", false, "Form User" },
                    { 2, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Form Create Rol", false, "Form Rol" }
                });

            migrationBuilder.InsertData(
                table: "modules",
                columns: new[] { "id", "active", "created_date", "description", "is_deleted", "name" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Module for User", false, "Module User" },
                    { 2, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Module for Rol", false, "Module Rol" }
                });

            migrationBuilder.InsertData(
                table: "permissions",
                columns: new[] { "id", "active", "created_date", "description", "is_deleted", "name" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Permiso de creacion", false, "Crear" },
                    { 2, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Permiso de borrar", false, "Borrar" },
                    { 3, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Permiso de Actualizar", false, "Actualizar" },
                    { 4, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Permiso de Leer", false, "Leer" }
                });

            migrationBuilder.InsertData(
                table: "persons",
                columns: new[] { "id", "active", "address", "created_date", "firstName", "is_deleted", "lastName", "phoneNumber" },
                values: new object[,]
                {
                    { 1, true, "AV SiempreViva", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", false, "Admin", "1234567890" },
                    { 2, true, "AV SiempreViva", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "User", false, "User", "1234567890" }
                });

            migrationBuilder.InsertData(
                table: "rols",
                columns: new[] { "id", "active", "created_date", "description", "is_deleted", "name" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Rol con permisos administrativos", false, "Administrador" },
                    { 2, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Rol con permisos de usuario", false, "Usuario" }
                });

            migrationBuilder.InsertData(
                table: "form_modules",
                columns: new[] { "id", "active", "created_date", "formid", "is_deleted", "moduleid" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, false, 1 },
                    { 2, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, false, 2 }
                });

            migrationBuilder.InsertData(
                table: "rol_form_permissions",
                columns: new[] { "id", "active", "created_date", "formid", "is_deleted", "permissionid", "rolid" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, false, 1, 1 },
                    { 2, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, false, 2, 2 }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "PersonId", "active", "created_date", "email", "is_deleted", "name", "password" },
                values: new object[,]
                {
                    { 1, 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin@example.com", false, "admin", "admin123" },
                    { 2, 2, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "User@example.com", false, "User", "user123" }
                });

            migrationBuilder.InsertData(
                table: "rolUsers",
                columns: new[] { "id", "active", "created_date", "is_deleted", "rolId", "userId" },
                values: new object[] { 1, true, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_form_modules_formid",
                table: "form_modules",
                column: "formid");

            migrationBuilder.CreateIndex(
                name: "IX_form_modules_moduleid",
                table: "form_modules",
                column: "moduleid");

            migrationBuilder.CreateIndex(
                name: "IX_rol_form_permissions_formid",
                table: "rol_form_permissions",
                column: "formid");

            migrationBuilder.CreateIndex(
                name: "IX_rol_form_permissions_permissionid",
                table: "rol_form_permissions",
                column: "permissionid");

            migrationBuilder.CreateIndex(
                name: "IX_rol_form_permissions_rolid",
                table: "rol_form_permissions",
                column: "rolid");

            migrationBuilder.CreateIndex(
                name: "IX_rolUsers_rolId",
                table: "rolUsers",
                column: "rolId");

            migrationBuilder.CreateIndex(
                name: "IX_rolUsers_userId",
                table: "rolUsers",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_users_PersonId",
                table: "users",
                column: "PersonId",
                unique: true,
                filter: "[PersonId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UX_User_NormalizedEmail_Active",
                table: "users",
                column: "normalized_email",
                unique: true,
                filter: "[is_deleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "form_modules");

            migrationBuilder.DropTable(
                name: "rol_form_permissions");

            migrationBuilder.DropTable(
                name: "rolUsers");

            migrationBuilder.DropTable(
                name: "modules");

            migrationBuilder.DropTable(
                name: "forms");

            migrationBuilder.DropTable(
                name: "permissions");

            migrationBuilder.DropTable(
                name: "rols");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "persons");
        }
    }
}
