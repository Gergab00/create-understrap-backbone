const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const { create } = require('./models/create');

const main = async() => {

    let opt;

    do{

        opt = await inquirerMenu();
        
        switch( opt ) {

            case 1:
                // Mostrar mensaje
                
                const theme_name = await readInput('Theme Name: ', 'Understrap Child');
                const theme_uri = await readInput('Theme URI: ', 'https://understrap.com');
                const theme_slug = await readInput('Theme Slug: ', 'UnderstrapChild');
                const theme_description = await readInput('Description: ', 'Understrap Child Theme');
                const author = await readInput('Author: ', 'the Understrap Contributors');
                const author_uri = await readInput('Author URI: ', 'https://github.com/understrap/understrap-child/graphs/contributors');
                const version = await readInput('Version: ', '1.1.0');
                
                const template = {
                "theme_name" : theme_name,
                "theme_uri" : theme_uri,
                "theme_slug" : theme_slug,
                "theme_description" : theme_description,
                "author" : author,
                "author_uri" : author_uri,
                "version" : version,
                }

                await create(template);

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);

                break;           

        }

        if ( opt != 0 ) await pause();

    } while ( opt != 0 )

}

main();
