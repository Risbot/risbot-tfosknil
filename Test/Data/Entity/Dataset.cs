using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Test.Data
{
    public class Dataset
    {
        public Dataset()
        {
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public ICollection<Friendship> Friendships { get; set; }
    }
}
