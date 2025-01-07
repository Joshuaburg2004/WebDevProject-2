using System.Text.Json.Serialization;

public class Admin
{
    
    public Guid Id {get; set;}
    public string? Username {get; set;}
    public string? Email {get; set;}
    public string? Password {get; set;}
    public Admin(Guid id, string username, string email, string password)
    {
        Id = id;
        Username = username;
        Email = email;
        Password = password;
    }

    public Admin(string username, string email, string password)
    {
        Id = Guid.NewGuid();
        Username = username;
        Email = email;
        Password = password;
    }
    [JsonConstructor]
    public Admin(){}
    public void EventAccept(Event eventid){
        eventid.admin_approval = true;
    }
    public void EventDecline(Event eventid){
        eventid.admin_approval = false;
    }
}