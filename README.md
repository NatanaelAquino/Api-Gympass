# APP 

GymPass Style app 

## RFS (Requisitos Funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuário logado;
- [x] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possivel o usuário obter seu histórico de check-ins;
- [x] Deve ser possivel o usuário buscar academias próximas (até 10km);
- [x] Deve ser possivel o usuário buscar academias por nome;
- [x] Deve ser possivel o usuário fazer check-in em uma academia;
- [x] Deve ser possivel cadastrar uma academia;

## RNS (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um email que já existe;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após a criação;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFS (Requisitos Não Funcionais)

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação precisam está persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um token JWT;