using System.Security.Claims;
using backend.Models.Helpers;

namespace backend.Helpers
{
  public static class UserHelper
  {
    public static int GetValidUserId(ClaimsPrincipal user)
    {
      string? userId = user.FindFirstValue("UserId") ?? throw new UnauthorizedAccessException("Missing 'UserId' claim.");

      try
      {
        return int.Parse(userId);
      }
      catch (FormatException)
      {
        throw new UnauthorizedAccessException("Invalid 'UserId' format. Expected integer.");
      }
    }
    public static TokenData GetRoleAndCatererId(ClaimsPrincipal user)
    {
      string? userType = user.FindFirstValue(ClaimTypes.Role) ?? throw new UnauthorizedAccessException("Missing 'UserType' claim.");
      string? catererId = user.FindFirstValue("CatererId") ?? throw new UnauthorizedAccessException("Missing 'CatererId' claim.");

      try
      {
        return new TokenData
        {
          UserType = userType,
          CatererId = int.Parse(catererId)
        };
      }
      catch (FormatException)
      {
        throw new UnauthorizedAccessException("Invalid 'CatererId' format. Expected integer.");
      }
    }
  }

}