using System.Text.Json.Serialization;

public class User
{
    public Guid Id {get; set;} = Guid.NewGuid();
    public string? FirstName {get; set;}
    public string? LastName {get; set;}
    public string? Email {get; set;}
    public string? Password {get; set;}
    public int Recurring_days {get; set;} = 0;
    public User(Guid id)
    {
        Id = id;
        FirstName = null;
        LastName = null;
        Email = null;
        Password = null;
        Recurring_days = 0;
    }
    
    public User(Guid id, string first_name, string last_name, string email, string password, int recurring_days)
    {
        Id = id;
        FirstName = first_name;
        LastName = last_name;
        Email = email;
        Password = password;
        Recurring_days = recurring_days;
    }
    public User(string first_name, string last_name, string email, string password, int recurring_days)
    {
        Id = Guid.NewGuid();
        FirstName = first_name;
        LastName = last_name;
        Email = email;
        Password = password;
        Recurring_days = recurring_days;
    }
    [JsonConstructor]
    public User(){}
}