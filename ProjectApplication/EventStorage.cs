using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text.Json; 
using Microsoft.EntityFrameworkCore;

public class EventStorage : IEventStorage
{
    private const string filepath = "events/events.json";

    public async Task CreateEvent(Event @event)
    {
        if (@event == null)
        {
            throw new ArgumentNullException(nameof(@event), "Event cannot be null.");
        }
        
        List<Event> events = new List<Event>();

        if (File.Exists(filepath))
        {
            var jsonString = await System.IO.File.ReadAllTextAsync(filepath);
            events = JsonSerializer.Deserialize<List<Event>>(jsonString) ?? new List<Event>();
        }
        events.Add(@event);
        await System.IO.File.WriteAllTextAsync($"events/events.json", JsonSerializer.Serialize(events));


        //check for @event = null . use filepath , (check if create json can be done differently)
    }

    public async Task DeleteEvent(Guid eventID)
    {
        var events = JsonSerializer.Deserialize<List<Event>>(System.IO.File.ReadAllText(filepath));
        if (events is null) 
        { 
            return; 
        }

        var eventToRemove = events.FirstOrDefault(_ => _.Id == eventID);
        if (eventToRemove != null)
        {
            events.Remove(eventToRemove);
            await System.IO.File.WriteAllTextAsync(filepath, JsonSerializer.Serialize(events));
        }
    }

    public async Task<Event?> ChangeEvent(Guid eventId)
    {
        return null;
    }

    public async Task<Event?> FindEvent(Guid eventId)
    {
        var events = JsonSerializer.Deserialize<List<Event>>(await System.IO.File.ReadAllTextAsync(filepath));
        if(events == null)
        {
            return null;
        }

        var foundevents = events.FirstOrDefault(_ => _.Id == eventId);
        return foundevents;
    }

    public async Task<List<Event>> FindManyEvents(Guid[] eventIds)
    {
        var events = JsonSerializer.Deserialize<List<Event>>(await System.IO.File.ReadAllTextAsync(filepath));
        if(events == null)
        {
            return new List<Event>();
        }
        var foundevents = events.Where(_ => eventIds.Contains(_.Id)).ToList();
        return foundevents;
    }


}