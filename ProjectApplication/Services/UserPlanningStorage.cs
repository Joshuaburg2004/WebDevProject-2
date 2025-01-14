using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text.Json; 
using Microsoft.EntityFrameworkCore;
public class UserPlanningStorage : IUserPlanningStorage
{
    public async Task CreatePlanning(UserPlanning userPlanning) 
    {
        var newUserPlanning = JsonSerializer.Deserialize<List<UserPlanning>>(System.IO.File.ReadAllText($"users/userplanning.json"));
        if(newUserPlanning is null){ newUserPlanning = new List<UserPlanning>(); }
        newUserPlanning.Add(userPlanning);
        await System.IO.File.WriteAllTextAsync($"users/users.json", JsonSerializer.Serialize(newUserPlanning));
    }

}