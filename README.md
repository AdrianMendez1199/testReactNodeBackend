# Test Backend

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/762029ffed2844c383bccfc6ef3f7bf7)](https://app.codacy.com/manual/AdrianMendez1199/testReactNodeBackend?utm_source=github.com&utm_medium=referral&utm_content=AdrianMendez1199/testReactNodeBackend&utm_campaign=Badge_Grade_Settings)

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
    
    * yarn prisma introspect

    * yarn prisma generate
  ```

  # Iniciar Servicio
  * yarn start

  ##### server is runing on http://localhost:4000
 
