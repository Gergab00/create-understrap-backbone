const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Configure your theme.`
            },
            {
                value: 2,
                name: `${ '2.'.green } Create a new block.`
            },
            {
                value: 3,
                name: `${ '3.'.green } Create a new template.`
            },
            {
                value: 4,
                name: `${ '4.'.green } Create a new page-template.`
            },
            {
                value: 0,
                name: `${ '0.'.green } Exit`
            },
        ]
    }
];

const questions_theme_parts = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Create Frontpage file.`
            },
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('============================================================='.cyan);
    console.log('\tWelcome to Understrap Framework Theme'.white );
    console.log('\tThis is the console to configure your theme,\n\tcreate theme parts, page templates and blocks.'.green );
    console.log('=============================================================\n'.cyan);

    const { options } = await inquirer.prompt(questions);

    return options;
}

const templateThemeMenu = async () => {
    console.clear();
    console.log("Select the type of Theme Part that you want to create.".green);
    console.log("WARNING:".red, "If the file already exists it will be overwritte.".yellow);

    const { options } = await inquirer.prompt(questions_theme_parts);

    return options;
}

const pause = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'enter'.green } to continue`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async( message, d ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            default: d,
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    templateThemeMenu
}
