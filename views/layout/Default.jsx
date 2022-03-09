const React = require('react')

class DefaultLayout extends React.Component{
    render() {
        return (
            
            <html lang="en" dir="ltr">
                <head>
                    {/* charset needs to be Camel Cased in JSX */}
                    <meta charSet='utf-8' />
                    {/* This lets us dynamically create the title */}
                    <title>{this.props.title}</title>
                    <link rel="stylesheet" href="/css/app.css" />
                </head>   
                <body>
                    <h1>{this.props.title}</h1>
                    {/*This is where our other components will be injected */}
                    {this.props.children}
                </body> 
            </html>
        )
    }
}

module.exports = DefaultLayout