# TesteEducacional

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Instruções

Chegou a hora do nosso desafio! Está pronto? Esperamos que sim !

Vamos lá, serão duas telinhas com atividades separadas em duas partes. Conforme você vai avançando, mais dificil vai ficando!
Não é necessário executar todas as tarefas, o mais interessante é você executar cada uma delas da melhor forma que conseguir.
Não fique batendo cabeça! Você pode começar tanto pela parte 1 quanto pela parte 2.

Como sabe meu amigo, nós trabalhamos com a área de ensino. Não sabia? Poxa!
Como somos da área de ensino, nosso teste será relacionado a uma situação comum nossa, um digamos, relatório operável (acabei de inventar esse termo eu acho)

Sobre a tela 1, parte 1: Nós precisamos saber quais são nossos alunos e as quais degrees (séries) e classes (classe) o mesmo pertence.
E tem aquela coisa, erro de cadastro acontece... Então queremos uma opção de editar os dados dos alunos após vermos os mesmo populados. No nosso caso aqui temos poucos alunos mas vamos supor que essa solução entre em nossa operação, ai teremos muitos alunos, por isso precisamos de filtros.

Sobre a tela 1, parte 2: Como nós temos poucos dados, queremos simular um cenário mais amplo. Por isso necessitamos de uma ferramenta que gere registros de alunos, mas os registros não podem estar relacionados a só uma turma, eles tem que ser distribuidos. Não que eu não confie em você mas, seria bacana um gráfico para ver se foram distribuídos aleatoriamente, beleza?

Vamos lá aos requisitos para a tela 1

### Parte 1

    - Criar combo de filtro a base dos JSONs 'degrees','classes'
    - Popular a tela com as informações de students e suas relações (trazendo nome do degree, nome do class)
    - Dar opção para editar o nome dos students e a class atribuida ao mesmo
    - Filtrar conforme combo sempre levando em consideração os dados pós-alteração

### Parte 2

    - Criar botão que gera mais 300 students e os distribuí entre os degrees e classes
    - Gerar gráfico com a quantidade de students por degree
    Nota: A cada clique no botão serão gerados + 300 students e o gráfico deverá ser atualizado

Aeee! Você terminou a parte 1? Ah é, tem a possibilidade de ter começado por aqui, então sem comemorações por enquanto, vamos ao trabalho.

Sobre a tela 2 parte 1: Na tela 1 queriamos saber a respeito dos nossos alunos, agora queremos saber a respeito dos nossos professores. É bem parecido. Precisamos saber quem são, em que degrees (série) dão aula, em que classes (classe) dão aula e além disso, ter uma opçãozinha que ao clicarmos, magicamente trás os alunos relacionados aquela série. Como sempre, precisamos dos filtrinhos.

Sobre a tela 2 parte 2: Agora é vem o pulo do gato. Estamos vendo a telinha e tal, beleza, bacana, todos os professores ali! Não! Não? Não estão, falta um registro! Por isso precisamos de um formulário que gere um novo registro para a relationships e exiba no contexto da parte 1.

Vamos lá aos requisitos para a tela 2

### Parte 1

    - Criar combo filtro a base dos JSONs 'degrees','classes'
    - Popular a tela utilizando o JSON relationships. Nessa tela será necessária a visualização os seguintes itens:nome do professor, nome da materia, todos os nomes dos degrees relacionados, todos os nomes de classe de cada class relacionada ao degree
    - Criar botão que ao clicar, trás os students relacionados ao degree em questão

### Parte 2

    - Criar formulário para gerar um novo registro do relationships. O registro deverá ser passivel as operações da parte 1 da tela 2
