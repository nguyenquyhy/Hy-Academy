using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HyAcademy.Data.EF.MySql.Migrations
{
    public partial class AddProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleAssignment_Profile_ProfileId",
                table: "RoleAssignment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Profile",
                table: "Profile");

            migrationBuilder.RenameTable(
                name: "Profile",
                newName: "Profiles");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Profiles",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Profiles",
                table: "Profiles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleAssignment_Profiles_ProfileId",
                table: "RoleAssignment",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleAssignment_Profiles_ProfileId",
                table: "RoleAssignment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Profiles",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Profiles");

            migrationBuilder.RenameTable(
                name: "Profiles",
                newName: "Profile");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Profile",
                table: "Profile",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleAssignment_Profile_ProfileId",
                table: "RoleAssignment",
                column: "ProfileId",
                principalTable: "Profile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
