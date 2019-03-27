# OData
<img src ="https://cdn-images-1.medium.com/max/1200/1*Fj6-LvVtf4vjw9teAiQxyA.png">

OData has specifications that cover almost every aspect of a RESTful API. But getting started with OData is pretty easy.

## For complete beginners
The [Understand OData in 6 steps](https://www.odata.org/getting-started/understand-odata-in-6-steps/) tutorial captures the most representative scenarios of OData and REST. It has detailed description of the scenarios and has sample code snippets on different programming platforms to showcase how an OData based RESTful API can be consumed.

## Basic Tutorial
The [basic tutorial](https://www.odata.org/getting-started/basic-tutorial/) will walk brand-new developers through the absolute basics of requesting, querying, and modifying resources in an OData service. Since OData is best practices for REST APIs, this tutorial will feel a lot like documentation you might read for a custom REST API - but you can apply the principles you learn here to *all* OData APIs.

## Advanced Tutorial
The [advanced tutorial](https://www.odata.org/getting-started/advanced-tutorial/) will continue the lesson by introducing more advanced concepts such as:
- Dynamic types
- Type inheritance
- Batch requests

As with the basic tutorial, all of the principles in the advanced tutorial can be applied to any OData API.

# Implementations

## Asp.Net Core WebAPI
To implement Odata V4 with Asp.Net Core >2.1 follow this [article][aspnetcore-odata-V4], for V3 please follow this [article][aspnetcore-odata-V3]. You can parallelly run both api versions in a single webapi application.

### Implementation
Update your application by following these [Steps][aspnetcore-implementation].



<!-- Images and links -->
[aspnetcore-odata-V4]:https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/create-an-odata-v4-endpoint
[aspnetcore-odata-V3]: https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v3/creating-an-odata-endpoint
[pm-link]: https://docs.microsoft.com/en-us/nuget/tools/package-manager-console
[aspnetcore-implementation]: implementation/aspnetcoreodatav4.md
