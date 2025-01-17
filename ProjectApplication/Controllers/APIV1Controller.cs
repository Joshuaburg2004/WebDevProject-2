using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
[ActivatorUtilitiesConstructor]
[Route("/api/v1")]
public class APIV1Controller : Controller
{
    JsonSerializerOptions options = new JsonSerializerOptions { IncludeFields = true };
    private IUserStorage _userStorage {get; set;}
    private IAdminStorage _adminStorage { get; set; }
    private IUserPlanningStorage _userPlanningStorage { get; set; }
    public APIV1Controller(IUserStorage userStorage, IAdminStorage adminStorage, IUserPlanningStorage userPlanningStorage){
        _userStorage = userStorage;
        _adminStorage = adminStorage;
        _userPlanningStorage = userPlanningStorage;
    }

    [HttpGet("get/user")]
    public async Task<IActionResult> GetUser([FromQuery] Guid userId){
        return Ok(await _userStorage.FindUser(userId));
    }

    [HttpGet("get/allusers")]
    public async Task<IActionResult> GetAllUsers(){
        return Ok(await _userStorage.GetAllUsers());
    }

    [HttpGet("login/user")]
    public async Task<IActionResult> LoginUser([FromQuery] string email, [FromQuery] string password){
        var user = await _userStorage.LogIn(email, password);
        if(user is null){ return NotFound(); }
        return Ok(user);
    }

    [HttpGet("get/batchusers")]
    public async Task<IActionResult> GetBatchUsers([FromQuery] Guid[] userIds){
        await _userStorage.FindManyUsers(userIds);
        return Ok();
    }

    /* Save is included in create, so as to avoid to many endpoints doing the same thing over and over again. */
    [HttpPost("create/user")]
    public async Task<IActionResult> CreateUser([FromBody] User user){
        User? success = await _userStorage.CreateUser(user);
        if(success == null){ return BadRequest(); }
        return Ok(success);
    }
    
    [HttpDelete("delete/user")]
    public async Task<IActionResult> DeleteUser([FromQuery] Guid userId){
        var user = await _userStorage.FindUser(userId);
        if(user is null){ return NotFound(); }
        await _userStorage.DeleteUser(user);
        return Ok();
    }

    [HttpGet("get/admin")]
    public async Task<IActionResult> GetAdmin([FromQuery] Guid adminId){
        await _adminStorage.FindAdmin(adminId);
        return Ok();
    }

    [HttpGet("get/batchamins")]
    public async Task<IActionResult> GetBatchAdmins([FromQuery] Guid[] adminIds){
        await _adminStorage.FindManyAdmins(adminIds);
        return Ok();
    }

    /* Save is included in create, so as to avoid to many endpoints doing the same thing over and over again. */
    [HttpPost("create/admin")]
    public async Task<IActionResult> CreateAdmin([FromBody] Admin admin){
        await _adminStorage.CreateAdmin(admin);
        return Ok();
    }
    
    [HttpDelete("delete/admin")]
    public async Task<IActionResult> DeleteAdmin([FromQuery] Guid adminId){
        var admin = await _adminStorage.FindAdmin(adminId);
        if(admin is null){ return NotFound(); }
        await _adminStorage.DeleteAdmin(admin);
        return Ok();
    }

    [HttpPost("create/planning")]
    public async Task<IActionResult> CreatePlanning([FromBody] UserPlanning userPlanning){
        await _userPlanningStorage.CreatePlanning(userPlanning);
        return Ok();
    }
}