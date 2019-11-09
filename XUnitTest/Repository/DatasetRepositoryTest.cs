using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Data;
using Test.Repository;
using Xunit;

namespace XUnitTest.Repository
{
    public class DatasetRepositoryTest
    {
        private readonly AppDbContext _context; 
        public DatasetRepositoryTest()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=test_db;Trusted_Connection=True;MultipleActiveResultSets=true;AttachDBFileName=C:\\Users\\Armen\\test_db.mdf")
                .Options;

            _context = new AppDbContext(options);
        }

        [Fact]
        public async Task AddDataset()
        {
            try
            {
                _context.Database.EnsureCreated();

                var repository = new DatasetRepository(_context);
                await repository.AddDatasetAsync("dataset name", new List<string>() { "1 0", "1 2" });

                Assert.Equal(1, _context.Datasets.Count());
                Assert.Equal(2, _context.Datasets.Select(c=>c.Friendships).Single().Count());
                Assert.Equal("dataset name", _context.Datasets.Single().Name);
                var data = new Tuple<string,string>[]{
                       new Tuple<string,string>("1", "0"),
                       new Tuple<string,string>("1", "2")
                };
                Assert.Equal(
                    data,
                    _context
                        .Datasets
                        .Select(c => c.Friendships)
                        .Single()
                        .Select(c => new Tuple<string, string>(c.UserOne, c.UserTwo))
                        .ToArray()
               );
            }
            finally
            {
                _context.Database.EnsureDeleted();
            }
        }

        [Fact]
        public async Task GetDatasets()
        {
            try
            {
                _context.Database.EnsureCreated();

                var repository = new DatasetRepository(_context);
                await repository.AddDatasetAsync("dataset 1", new List<string>() { "1 0", "1 2" });
                await repository.AddDatasetAsync("dataset 2", new List<string>() { "3 1", "1 2" });

                var datasets = await repository.GetDatasetsAsync();

                Assert.Equal(2, datasets.Count());
            }
            finally
            {
                _context.Database.EnsureDeleted();
            }
        }

        [Fact]
        public async Task GetFriendships()
        {
            try
            {
                _context.Database.EnsureCreated();

                var repository = new DatasetRepository(_context);
                await repository.AddDatasetAsync("dataset 1", new List<string>() { "1 0", "1 2" });
                var datasets = await repository.GetDatasetsAsync();
                var friendships = await repository.GetFriendshipsAsync(datasets.Single().Id);

                Assert.Equal(2, friendships.Count());
            }
            finally
            {
                _context.Database.EnsureDeleted();
            }
        }

        [Fact]
        public async Task GetUsersAsync()
        {
            try
            {
                _context.Database.EnsureCreated();

                var repository = new DatasetRepository(_context);
                await repository.AddDatasetAsync("dataset 1", new List<string>() { "1 0", "1 2" });
                var datasets = await repository.GetDatasetsAsync();
                var users = await repository.GetUsersAsync(datasets.Single().Id);

                Assert.Equal(3, users.Count);
                Assert.Equal(new List<string> {"0", "1", "2" }, users);
            }
            finally
            {
                _context.Database.EnsureDeleted();
            }
        }


        [Fact]
        public async Task GetUsersCountAsync()
        {
            try
            {
                _context.Database.EnsureCreated();

                var repository = new DatasetRepository(_context);
                await repository.AddDatasetAsync("dataset 1", new List<string>() { "1 0", "1 2" });
                var datasets = await repository.GetDatasetsAsync();
                var usersCount = await repository.GetUsersCountAsync(datasets.Single().Id);

                Assert.Equal(3, usersCount);
            }
            finally
            {
                _context.Database.EnsureDeleted();
            }
        }

        [Fact]
        public async Task GetFriendsCountPerUser()
        {
            try
            {
                _context.Database.EnsureCreated();

                var repository = new DatasetRepository(_context);
                await repository.AddDatasetAsync("dataset 1", new List<string>() { "1 0", "1 2" });
                var datasets = await repository.GetDatasetsAsync();
                var friendsCountPerUser = await repository.GetFriendsCountPerUserAsync(datasets.Single().Id);

                Assert.Equal(3, friendsCountPerUser.Count());
                Assert.Equal(2, friendsCountPerUser["1"]);
                Assert.Equal(1, friendsCountPerUser["0"]);
                Assert.Equal(1, friendsCountPerUser["2"]);
            }
            finally
            {
                _context.Database.EnsureDeleted();
            }
        }
    }
}
