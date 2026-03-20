# APP 

GymPass Style app 

## RFS (Requisitos Funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuário logado;
- [ ] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possivel o usuário obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuário buscar academias próximas;
- [ ] Deve ser possivel o usuário buscar academias por nome;
- [ ] Deve ser possivel o usuário fazer check-in em uma academia;
- [ ] Deve ser possivel cadastrar uma academia;

## RNS (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um email que já existe;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após a criação;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFS (Requisitos Não Funcionais)

- [ ] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam está persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um token JWT;