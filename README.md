
## Prerequiment
- insatll extention [cors unblock](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en)
- install [node](https://n...content-available-to-author-only...s.org/en)
- install [yarn](https://y...content-available-to-author-only...g.com/) or [npm](https://w...content-available-to-author-only...s.com/)

## Run
- run database: `docker-compose -p cukcuk up -d` or any thing
- run BE: `dotnet run -p path/to/EmployeeManagement.csproj`
- run FE: (proxy and datatable)
    - proxy: 
    ```
    cd `src/proxy` (create server proxy to bypass cors)
    yarn install
    yarn start
    ```
    - datatable:
    ```
    open datatable.html file (use google chrome or edge with cors unblock)
    ```
    
## Why proxy
- Server BR has no CORS enabled and browser will block request as a security measure. that why a proxy server comes into play. 
