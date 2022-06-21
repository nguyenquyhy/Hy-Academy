using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HyAcademy.Data.EF.MySql.Migrations
{
    public partial class AddLessonDisplayOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayOrders",
                table: "Course",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayOrders",
                table: "Course");
        }
    }
}
