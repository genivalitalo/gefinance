Mini Sistema Financeiro

Descrição

Este é um mini sistema financeiro de código aberto desenvolvido com o objetivo de aperfeiçoar conhecimentos em tecnologias modernas de desenvolvimento web. O projeto utiliza Prisma como ORM e PostgreSQL como banco de dados, oferecendo uma base para quem deseja estudar ou expandir suas habilidades em projetos de gestão financeira.

Requisitos

Node.js (versão 14 ou superior)

PostgreSQL (versão 12 ou superior)

NPM ou Yarn

Instalação

1. Clone o repositório:

git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>

2. Instale as dependências:

npm install
# ou
yarn install

3. Configure o banco de dados:

Certifique-se de que o PostgreSQL esteja instalado e em execução. Crie um banco de dados para o projeto:

Abra o terminal do PostgreSQL ou uma ferramenta de gestão de banco de dados.

Execute o comando:

CREATE DATABASE mini_financeiro;

4. Configure o Prisma:

4.1. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e adicione as seguintes informações:

DATABASE_URL="postgresql://<USUARIO>:<SENHA>@localhost:5432/mini_financeiro"

Substitua <USUARIO> e <SENHA> pelos seus dados do PostgreSQL.

4.2. Inicialize o Prisma:

npx prisma init

Isso criará um arquivo prisma/schema.prisma no projeto. Edite o arquivo para configurar o modelo do banco de dados conforme necessário.

5. Migrações do banco de dados:

Execute o seguinte comando para sincronizar o banco de dados com os modelos definidos no Prisma:

npx prisma migrate dev --name init

6. Execute o projeto:

npm start
# ou
yarn start

O servidor será iniciado e estará disponível em http://localhost:3000 (ou a porta configurada no projeto).

Scripts Disponíveis

npm run dev: Inicia o servidor em modo de desenvolvimento.

npm run build: Gera os arquivos otimizados para produção.

npm start: Inicia o servidor em produção.

Contribuição

Fique à vontade para contribuir com melhorias, correções ou novas funcionalidades. Para isso:

Faça um fork do repositório.

Crie uma branch para a sua funcionalidade:

git checkout -b minha-feature

Faça as alterações e commit:

git commit -m "Adiciona minha funcionalidade"

Envie para o repositório principal:

git push origin minha-feature

Abra um Pull Request.

Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.

