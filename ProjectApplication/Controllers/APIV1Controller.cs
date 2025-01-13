using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
[ActivatorUtilitiesConstructor]
[Route("/api/v1")]
public class APIV1Controller : Controller
{
    JsonSerializerOptions options = new JsonSerializerOptions { IncludeFields = true };
    public UserStorage userStorage = new UserStorage();
    public AdminStorage adminStorage = new AdminStorage();
    public UserPlanningStorage userPlanningStorage = new UserPlanningStorage();

    [HttpGet("get/user")]
    public async Task<IActionResult> GetUser([FromQuery] Guid userId){
        return Ok(await userStorage.FindUser(userId));
    }

    [HttpGet("get/batchusers")]
    public async Task<IActionResult> GetBatchUsers([FromQuery] Guid[] userIds){
        await userStorage.FindManyUsers(userIds);
        return Ok();
    }

    /* Save is included in create, so as to avoid to many endpoints doing the same thing over and over again. */
    [HttpPost("create/user")]
    public async Task<IActionResult> CreateUser([FromBody] User user){
        await userStorage.CreateUser(user);
        return Ok();
    }
    
    [HttpDelete("delete/user")]
    public async Task<IActionResult> DeleteUser([FromQuery] Guid userId){
        var user = await userStorage.FindUser(userId);
        if(user is null){ return NotFound(); }
        await userStorage.DeleteUser(user);
        return Ok();
    }

    [HttpGet("get/admin")]
    public async Task<IActionResult> GetAdmin([FromQuery] Guid adminId){
        await adminStorage.FindAdmin(adminId);
        return Ok();
    }

    [HttpGet("get/batchamins")]
    public async Task<IActionResult> GetBatchAdmins([FromQuery] Guid[] adminIds){
        await adminStorage.FindManyAdmins(adminIds);
        return Ok();
    }

    /* Save is included in create, so as to avoid to many endpoints doing the same thing over and over again. */
    [HttpPost("create/admin")]
    public async Task<IActionResult> CreateAdmin([FromBody] Admin admin){
        await adminStorage.CreateAdmin(admin);
        return Ok();
    }
    
    [HttpDelete("delete/admin")]
    public async Task<IActionResult> DeleteAdmin([FromQuery] Guid adminId){
        var admin = await adminStorage.FindAdmin(adminId);
        if(admin is null){ return NotFound(); }
        await adminStorage.DeleteAdmin(admin);
        return Ok();
    }

    [HttpPost("create/planning")]
    public async Task<IActionResult> CreatePlanning([FromBody] UserPlanning userPlanning){
        await userPlanningStorage.CreatePlanning(userPlanning);
        return Ok();
    }
}