# Test Backend

 ## Requerimientos
  * nodeJS versión v13.12.0 o superior 
  * Mysql versión 8.0.19 o superior 
  * yarn versión 1.22.4 o superior
  * git 

  ## Pasos para Configurar
   * create base de datos con script.sql

  ``` sh 
    * git clone https://github.com/AdrianMendez1199/testReactNodeBackend.git
       
      ó
       
      git clone git@github.com:AdrianMendez1199/testReactNodeBackend.git
     
    * cd batestReactNodeBackend 

    * cp .env.example .env

    * cp prisma/.env.example .env

    * configurar prisma/.env con credenciales mysql 
    
    * yarn install    
    
    * yarn prisma instrospect

    * yarn prisma generate
  ```

  # Iniciar Servicio
  * yarn start

  ##### server is runing on http://localhost:4000
 
