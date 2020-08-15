## Steps
### *Step 1* Install Package

Run the following command in the [Package Manager Console][pm-link].

``` sh
PM> Install-Package Microsoft.AspNet.OData
```

### Update your Models
In this getting-started example, we just update two model class `Todo.cs` and `Author.cs` under folder Models. `Author` can relate to `Task`.

``` c#
// Previous Author Model
using Todo.Service.Mongo.Entity;
using System;
using System.Collections.Generic;

namespace Todo.Service.Mongo.Models
{
    public class Author : IBaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Description { get; set; }

        public IList<TodoTask> Tasks { get; set; }
    }
}

// Updated Author Model
using Todo.Service.Mongo.Entity;
using System;
using System.Collections.Generic;

namespace Todo.Service.Mongo.Models
{
    public class Author : IBaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Description { get; set; }

        public IList<TodoTask> Tasks { get; set; }
    }
}
```

``` c#
// Previous Task Model
using Todo.Service.Mongo.Entity;
using Todo.Service.Mongo.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Todo.Service.Mongo.Models
{
    public class TodoTask
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IList<string> Tags { get; set; }
        public TaskPriority Status { get; set; }
        public TaskColor Color { get; set; }
    }
}

// Updated Author Model
using Todo.Service.Mongo.Entity;
using Todo.Service.Mongo.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Todo.Service.Mongo.Models
{
    public class TodoTask
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public IList<string> Tags { get; set; }
        public TaskPriority Status { get; set; }
        public TaskColor Color { get; set; }
    }
}
```

The attributes `[Key]` and `[Required]` are all from `System.ComponentModel.DataAnnotations` meaning the property is key and required seperately.