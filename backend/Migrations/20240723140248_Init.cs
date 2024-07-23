using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
  /// <inheritdoc />
  public partial class Init : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "CuisineTypes",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            CuisineName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
            CuisineImage = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
            CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
            UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_CuisineTypes", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "Users",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            Type = table.Column<byte>(type: "tinyint", nullable: false),
            Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            Password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
            UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Users", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "Messages",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            SenderId = table.Column<int>(type: "int", nullable: false),
            ReceiverId = table.Column<int>(type: "int", nullable: false),
            Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
            CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
            UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Messages", x => x.Id);
            table.ForeignKey(
                      name: "FK_Messages_Users_ReceiverId",
                      column: x => x.ReceiverId,
                      principalTable: "Users",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_Messages_Users_SenderId",
                      column: x => x.SenderId,
                      principalTable: "Users",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.NoAction);
          });

      migrationBuilder.CreateTable(
          name: "Profiles",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            UserId = table.Column<int>(type: "int", nullable: false),
            FirstName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
            LastName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
            Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
            Image = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Profiles", x => x.Id);
            table.ForeignKey(
                      name: "FK_Profiles_Users_UserId",
                      column: x => x.UserId,
                      principalTable: "Users",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          });

      migrationBuilder.CreateTable(
          name: "Caterers",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            ProfileId = table.Column<int>(type: "int", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Caterers", x => x.Id);
            table.ForeignKey(
                      name: "FK_Caterers_Profiles_ProfileId",
                      column: x => x.ProfileId,
                      principalTable: "Profiles",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          });

      migrationBuilder.CreateTable(
          name: "Bookings",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            CustomerId = table.Column<int>(type: "int", nullable: false),
            CatererId = table.Column<int>(type: "int", nullable: false),
            EventDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            Venue = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            PaymentMethod = table.Column<byte>(type: "tinyint", nullable: false),
            Occasion = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            NumberOfPeople = table.Column<int>(type: "int", nullable: false),
            BookingStatus = table.Column<byte>(type: "tinyint", nullable: false),
            CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
            UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Bookings", x => x.Id);
            table.ForeignKey(
                      name: "FK_Bookings_Caterers_CatererId",
                      column: x => x.CatererId,
                      principalTable: "Caterers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_Bookings_Users_CustomerId",
                      column: x => x.CustomerId,
                      principalTable: "Users",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.NoAction);
          });

      migrationBuilder.CreateTable(
          name: "FavoriteList",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            UserId = table.Column<int>(type: "int", nullable: false),
            CatererId = table.Column<int>(type: "int", nullable: false),
            CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
            UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_FavoriteList", x => x.Id);
            table.ForeignKey(
                      name: "FK_FavoriteList_Caterers_CatererId",
                      column: x => x.CatererId,
                      principalTable: "Caterers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_FavoriteList_Users_UserId",
                      column: x => x.UserId,
                      principalTable: "Users",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.NoAction);
          });

      migrationBuilder.CreateTable(
          name: "Items",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            CatererId = table.Column<int>(type: "int", nullable: false),
            CuisineId = table.Column<int>(type: "int", nullable: false),
            Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
            Image = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
            Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
            ServesCount = table.Column<int>(type: "int", nullable: false),
            ItemType = table.Column<byte>(type: "tinyint", nullable: false),
            Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
            CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
            UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Items", x => x.Id);
            table.ForeignKey(
                      name: "FK_Items_Caterers_CatererId",
                      column: x => x.CatererId,
                      principalTable: "Caterers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_Items_CuisineTypes_CuisineId",
                      column: x => x.CuisineId,
                      principalTable: "CuisineTypes",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.NoAction);
          });

      migrationBuilder.CreateTable(
          name: "BookingItems",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            BookingId = table.Column<int>(type: "int", nullable: false),
            ItemId = table.Column<int>(type: "int", nullable: false),
            Quantity = table.Column<int>(type: "int", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_BookingItems", x => x.Id);
            table.ForeignKey(
                      name: "FK_BookingItems_Bookings_BookingId",
                      column: x => x.BookingId,
                      principalTable: "Bookings",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_BookingItems_Items_ItemId",
                      column: x => x.ItemId,
                      principalTable: "Items",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.NoAction);
          });

      migrationBuilder.CreateIndex(
          name: "IX_BookingItems_BookingId",
          table: "BookingItems",
          column: "BookingId");

      migrationBuilder.CreateIndex(
          name: "IX_BookingItems_ItemId",
          table: "BookingItems",
          column: "ItemId");

      migrationBuilder.CreateIndex(
          name: "IX_Bookings_CatererId",
          table: "Bookings",
          column: "CatererId");

      migrationBuilder.CreateIndex(
          name: "IX_Bookings_CustomerId",
          table: "Bookings",
          column: "CustomerId");

      migrationBuilder.CreateIndex(
          name: "IX_Caterers_ProfileId",
          table: "Caterers",
          column: "ProfileId");

      migrationBuilder.CreateIndex(
          name: "IX_CuisineTypes_CuisineName",
          table: "CuisineTypes",
          column: "CuisineName",
          unique: true);

      migrationBuilder.CreateIndex(
          name: "IX_FavoriteList_CatererId",
          table: "FavoriteList",
          column: "CatererId");

      migrationBuilder.CreateIndex(
          name: "IX_FavoriteList_UserId",
          table: "FavoriteList",
          column: "UserId");

      migrationBuilder.CreateIndex(
          name: "IX_Items_CatererId",
          table: "Items",
          column: "CatererId");

      migrationBuilder.CreateIndex(
          name: "IX_Items_CuisineId",
          table: "Items",
          column: "CuisineId");

      migrationBuilder.CreateIndex(
          name: "IX_Items_Name",
          table: "Items",
          column: "Name",
          unique: true);

      migrationBuilder.CreateIndex(
          name: "IX_Messages_ReceiverId",
          table: "Messages",
          column: "ReceiverId");

      migrationBuilder.CreateIndex(
          name: "IX_Messages_SenderId",
          table: "Messages",
          column: "SenderId");

      migrationBuilder.CreateIndex(
          name: "IX_Profiles_UserId",
          table: "Profiles",
          column: "UserId");

      migrationBuilder.CreateIndex(
          name: "IX_Users_Email",
          table: "Users",
          column: "Email",
          unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "BookingItems");

      migrationBuilder.DropTable(
          name: "FavoriteList");

      migrationBuilder.DropTable(
          name: "Messages");

      migrationBuilder.DropTable(
          name: "Bookings");

      migrationBuilder.DropTable(
          name: "Items");

      migrationBuilder.DropTable(
          name: "Caterers");

      migrationBuilder.DropTable(
          name: "CuisineTypes");

      migrationBuilder.DropTable(
          name: "Profiles");

      migrationBuilder.DropTable(
          name: "Users");
    }
  }
}
