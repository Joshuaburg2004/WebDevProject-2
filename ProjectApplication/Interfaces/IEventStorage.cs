interface IEventStorage
{
    public Task CreateEvent(Event @event);
    public Task DeleteEvent(Guid eventId);

    public Task<Event?> ChangeEvent(Guid @event);

    public Task<Event?> FindEvent(Guid eventId);
    public Task<List<Event>> FindManyEvents(Guid[] eventIds);


//find and findmany
    //add the bodies and corresponding items)





}