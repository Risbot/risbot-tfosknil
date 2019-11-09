using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using Test.Data;
using System.Linq;
using System;

namespace Test.Repository
{
    public class DatasetRepository : IDatasetRepository
    {
        private readonly AppDbContext _context;
        public DatasetRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddDatasetAsync(string name, List<string> data)
        {
            Dataset dataset = new Dataset()
            {
                Name = name
            };

            _context.Add(dataset);
            _context.BulkInsert(
                data.Select(friendship => {
                    var pair = friendship.Split(' ');
                    return new Friendship()
                    {
                        DatasetId = dataset.Id,
                        UserOne = pair[0],
                        UserTwo = pair[1],
                    };
                }).ToArray()
            );
            await _context.SaveChangesAsync();
        }

        public Task<List<Dataset>> GetDatasetsAsync()
        {
            return _context.Datasets.ToListAsync();
        }
        
        public Task<List<Tuple<string,string>>> GetFriendshipsAsync(string datasetId)
        {
            return _context.Friendships
                .Where(c => c.DatasetId == datasetId)
                .Select(c => new Tuple<string, string>(c.UserOne, c.UserTwo))
                .ToListAsync();
        }

        public Task<List<string>> GetUsersAsync(string datasetId)
        {
            var friendships = _context.Friendships.Where(c=>c.DatasetId == datasetId);
            return friendships
                .Select(c => c.UserOne)
                .Union(friendships.Select(c => c.UserTwo))
                .ToListAsync();
        }
        
        public Task<int> GetUsersCountAsync(string datasetId)
        {
            var friendships = _context.Friendships.Where(c => c.DatasetId == datasetId);
            return friendships
                .Select(c => c.UserOne)
                .Union(friendships.Select(c => c.UserTwo))
                .CountAsync();
        }

        public async Task<Dictionary<string, int>> GetFriendsCountPerUserAsync(string datasetId)
        {
            var dictionary = new Dictionary<string, int>();
            var friendships = _context.Friendships.Where(c => c.DatasetId == datasetId);
            var groupByUserOne = friendships.GroupBy(c => c.UserOne).Select(c => new { user = c.Key, count = c.Count() });
            var groupByUserTwo = friendships.GroupBy(c => c.UserTwo).Select(c => new { user = c.Key, count = c.Count() });
            await (groupByUserOne.Union(groupByUserTwo)).GroupBy(c => c.user)
                .Select(c => new { c.Key, Count = c.Sum(c => c.count) })
                .ForEachAsync(c=> dictionary.Add(c.Key, c.Count));
            return dictionary;
        }
    }
}
