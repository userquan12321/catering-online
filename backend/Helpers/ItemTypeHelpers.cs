using backend.Enums;

namespace backend.Helpers
{
  public static class ItemTypeHelpers
  {
    private static readonly Dictionary<ItemType, string> Names = new()
    {
      {ItemType.Starter, "Starter"},
      {ItemType.MainCourse, "MainCourse"},
      {ItemType.Dessert, "Dessert"},
      {ItemType.Beverage, "Beverage"}
    };

    public static string GetName(this ItemType itemType)
    {
      return Names[itemType];
    }
  }

}