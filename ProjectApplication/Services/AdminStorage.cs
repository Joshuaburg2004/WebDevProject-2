using System.Text.Json;
public class AdminStorage : IAdminStorage{
    public async Task CreateAdmin(Admin admin) 
    {
        var users = JsonSerializer.Deserialize<List<Admin>>(System.IO.File.ReadAllText($"users/admins.json"));
        if(users is null){ users = new List<Admin>(); }
        users.Add(admin);
        await System.IO.File.WriteAllTextAsync($"users/users", JsonSerializer.Serialize(users));
    }

    public async Task SaveAdmin(Admin admin) =>
    await CreateAdmin(admin);

    public async Task<Admin?> FindAdmin(Guid adminId) {
        var admins = JsonSerializer.Deserialize<List<Admin>>(await System.IO.File.ReadAllTextAsync($"users/admins.json"));
        if(admins is null){ return null; }
        var admin = admins.FirstOrDefault(u => u.Id == adminId);
        return admin;
    }

    public async Task<List<Admin>> FindManyAdmins(Guid[] adminIds) {
        var admins = new List<Admin>();
        foreach (var adminId in adminIds) {
            var admin = await FindAdmin(adminId);
            if (admin != null) admins.Add(admin);
        }
        return admins;
    }

    public async Task DeleteAdmin(Admin admin) {
        var admins = JsonSerializer.Deserialize<List<Admin>>(System.IO.File.ReadAllText($"users/admins.json"));
        if(admins is null){ return; }
        admins.Remove(admin);
        await System.IO.File.WriteAllTextAsync($"users/admins.json", JsonSerializer.Serialize(admins));
    }
}