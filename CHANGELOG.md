# Complete list fo changes
- Project creation :link:[520866d](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/520866d13e9450ad123f2532dd23ea999a8eaaf3)

- Initialization :link:[9527481](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/9527481b22fb7beaefe025fc15931fd76076948b)
    - Update gitignore
    - Create CHANGELOG.md
    - Empty app.component.html

- Show a person on the application :link:[fd7d4ec](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/fd7d4ec058054b66b2cf03dda9c6a024159e46ec)
    - Generate person component
        ```
        ng generate component persons
        ```
    - Update files content

- Show a person using person interface :link:[a667841](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/a667841a0dba42c221d97b51f2e7dfc484e6a0af)

- Show several persons on the application :link:[9ab6204](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/9ab6204c68e91959b8c3d75fa38a5dfda58c4afb)
    - Create file personsEx.ts
    - Update files content

- Show details for each person when clicking its button :link:[16e073d](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/16e073d6d396bd301ff19df85336a65d31efcceb)

- Separate persons from their details :link:[7160073](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/716007386a822bcabdc3be31a1f6525973650b32)
    - Generate person-details component
        ```
        ng generate component personDetails
        ```
    - Update files content

- Add service to retrieve persons :link:[0ba664b](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/0ba664b0ccb58ec78e92985df18e0c8bee50bf08)
    - Generate person service
        ```
        ng generate service person
        ```
    - Update files content

- Add routing (for navigation) :link:[d565358](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/d565358b5883731e5d78e9550d5dece8a2c972eb)

# Build frontend for the backend application
:link:[Backend Application](https://github.com/catarinafoliveira/myApi_v1)

- Create main application layout :link:[d8bc612](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/d8bc612a27b74a787bb97722e57ebf33ebeffb88)
    - Install boostrap
        ```
        npm install bootstrap
        npm install --save-dev @types/bootstrap
        npm install @popperjs/core
        npm install @ng-bootstrap/ng-bootstrap
        ```
    - Remove folders
        - persons and all files
        - person-details and all files
    
    - Remove files
        - person.ts
        - personEx.ts
        - person.service.ts
        - person.service.spec.ts
    
    - Generate home, person, driver, and car components
        ```
        ng generate component home
        ng generate component person
        ng generate component driver
        ng generate component car
        ```
    - Update files content

    - Add images to ```public/``` folder

- Create and fill message service :link:[edb4ed2](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/edb4ed24c0a59fbccea2737560e53543cc021d9e)

    - Create service
        ```
        ng generate service message
        ```
    - Update files content

- Frontend: complete Person component :link:[3d9245a](https://github.com/catarinafoliveira/catarinafoliveira-myAngularV19Frontend_v1/commit/3d9245a16d7412966872a322dcbc23415766465f)
     - Create person model 
     - Create person service
        ```
        ng generate service person
        ```
     - Update files content

- Frontend: complete Driver component
    - Create driver model
    - Create driver service
        ```
        ng generate service driver
        ```
    - Update files content
    - Rearrange project to have a folder for models ```src/app/models/``` and another for services ```src/app/services/```