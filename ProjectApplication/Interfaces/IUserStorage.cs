using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
public interface IUserStorage
{
    public Task<bool> CreateUser(User user);

    public Task DeleteUser(User user);
    
    public Task<User?> FindUser(Guid userId);
    
    public Task<List<User>> FindManyUsers(Guid[] userIds);
    

}