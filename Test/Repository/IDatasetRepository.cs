using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data;

namespace Test.Repository
{
    public interface IDatasetRepository
    {
        Task AddDatasetAsync(string name, List<string> data);
        Task<List<Dataset>> GetDatasetsAsync();
        Task<List<Tuple<string, string>>> GetFriendshipsAsync(string datasetId);
        Task<List<string>> GetUsersAsync(string datasetId);
        Task<int> GetUsersCountAsync(string datasetId);
        Task<Dictionary<string, int>> GetFriendsCountPerUserAsync(string datasetId);
    }
}
