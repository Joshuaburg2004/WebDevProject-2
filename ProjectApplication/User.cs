using System.Text.Json.Serialization;

public class User
{
    public Guid Id {get; set;}
    public string? First_name {get; set;}
    public string? Last_name {get; set;}
    public string? Email {get; set;}
    public string? Password {get; set;}
    public int Recurring_days {get; set;}
    public User(Guid id)
    {
        Id = id;
        First_name = null;
        Last_name = null;
        Email = null;
        Password = null;
        Recurring_days = 0;
    }
    
    public User(Guid id, string first_name, string last_name, string email, string password, int recurring_days)
    {
        Id = id;
        First_name = first_name;
        Last_name = last_name;
        Email = email;
        Password = password;
        Recurring_days = recurring_days;
    }
    public User(string first_name, string last_name, string email, string password, int recurring_days)
    {
        Id = Guid.NewGuid();
        First_name = first_name;
        Last_name = last_name;
        Email = email;
        Password = password;
        Recurring_days = recurring_days;
    }
    [JsonConstructor]
    public User(){}
}