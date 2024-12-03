public class Event
{
    public Guid Id {get;set;}
    public string? title {get;set;}
    public string? description {get;set;}
    public DateOnly date {get;set;}
    public TimeOnly start_time {get;set;}
    public TimeOnly end_time {get;set;}
    public string? location {get;set;}
    public bool admin_approval {get;set;}
    public Event(Guid id){
        Id = id;
        title = null;
        description = null;
        date = new DateOnly();
        start_time = new TimeOnly();
        end_time = new TimeOnly();
        location = null;
        admin_approval = false;
    }
}


//fields om naar properties
//interface voor event storage (kijk iadminstorage etc)
//attendance storage maken - // en event context

//maak de code voor de events en attendence