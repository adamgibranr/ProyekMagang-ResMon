<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Phone Book App</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
        </script>
    </head>
    <body>
        <div class="container mt-5">
            <table class="table mt-5">
                <thead>
                    @if (isset($resource) >= 0)

                        <tr>
                            <th scope="col">Id</th>
                            <th>{{ $resource->id }}</th>
                        </tr>
                        <tr>
                            <th scope="col">CPU Cores :</th>
                            <th>{{ $resource->cpu_cores }}</th>
                        </tr>
                        <tr>
                            <th scope="col">CPU Thread :</th>
                            <th>{{ $resource->cpu_thread }}</th>
                        </tr>
                        <tr>
                            <th scope="col">Base Frequency</th>
                            <th>{{ $resource->cpu_basefreq }}</th>
                        </tr>
                            
                    @else
                        <tr>
                            <th>No Data</th>
                        </tr>
                    @endif
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </body>
</html>