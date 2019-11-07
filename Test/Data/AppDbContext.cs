using Microsoft.EntityFrameworkCore;

namespace Test.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Dataset> Datasets { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Friendship>().HasKey(c => new { c.UserOne, c.UserTwo, c.DatasetId });
        }
    }
}
