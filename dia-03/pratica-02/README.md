# API de Usuários

## Executar localmente

Na pasta do projeto:

```bash
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

O projeto usa SQLite no arquivo `dev.db`, sem precisar iniciar um servidor de banco ou Docker. Configure `DATABASE_URL="file:./dev.db"` no `.env` para os comandos do Prisma, conforme o `prisma7.config.ts`. O comando `prisma db push` cria o banco e sincroniza as tabelas.

Com a aplicação rodando, acesse <http://localhost:3000/docs>. O documento OpenAPI está em <http://localhost:3000/docs-json>. A porta padrão é 3000 e pode ser alterada pela variável `PORT`.

## Demonstração no Swagger

1. Abra `GET /usuarios` e clique em **Try it out → Execute** para consultar usuários e observar o status e o corpo da resposta. O filtro `nome` é opcional.
2. Abra `POST /usuarios`, clique em **Try it out** e envie o exemplo:

   ```json
   {
     "nome": "Carlos",
     "email": "carlos@uem.br",
     "idade": 25
   }
   ```

   `idade` é opcional. Use um e-mail ainda não cadastrado para receber **201**.
3. Execute novamente com o mesmo e-mail para receber **409** (e-mail já cadastrado).
4. Consulte, atualize ou remova um ID inexistente para receber **404** (usuário não encontrado).

`DocumentBuilder` define as informações gerais da documentação; `createDocument()` gera a descrição OpenAPI; `setup()` disponibiliza a interface em `/docs`. `ApiProperty` fornece os campos e exemplos documentados. `ApiPropertyOptional` documenta os campos opcionais.

O Swagger envia requisições reais e exibe as respostas. Os decorators de documentação não validam as entradas; o serviço trata usuário inexistente e e-mail duplicado.
