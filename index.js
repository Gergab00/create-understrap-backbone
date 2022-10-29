const { readInput, inquirerMenu, pause, templateThemeMenu } = require('./helpers/inquirer');
const { createStylePackage, createFrontpage } = require('./models/create');

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
                const git_uri = await readInput('Git URI: ', 'https://github.com/understrap/understrap-child.git');
                
                const template = {
                "theme_name" : theme_name,
                "theme_uri" : theme_uri,
                "theme_slug" : theme_slug,
                "theme_description" : theme_description,
                "author" : author,
                "author_uri" : author_uri,
                "version": version,
                "git_uri": git_uri
                }

                await createStylePackage(template);

                break;
            
            case 2:

                break;
            case 3:
                let opt_2 = await templateThemeMenu();

                switch (opt_2) { 
                    case 1:
                        console.log("Creating file, please wait...".cyan)
                        await createFrontpage().then(() => console.log("File created...".green));
                        break;
                }
                //createThemeParts();
                break;

        }

        if ( opt != 0 ) await pause();

    } while ( opt != 0 )

}

main();
