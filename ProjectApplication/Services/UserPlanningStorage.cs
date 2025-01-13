using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text.Json; 
using Microsoft.EntityFrameworkCore;
public class UserPlanningStorage : IUserPlanningStorage
{
    public async Task CreatePlanning(User user) 
    {
        var users = JsonSerializer.Deserialize<List<User>>(System.IO.File.ReadAllText($"users/users.json"));
        if(users is null){ users = new List<User>(); }
        users.Add(user);
        await System.IO.File.WriteAllTextAsync($"users/users.json", JsonSerializer.Serialize(users));
    }
    
    public async Task SaveUser(User user) => 
    await CreatePlanning(user);


}