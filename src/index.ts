import app from './app'
import Connection from './database'

app.listen(app.get('port'), async () => {
    try {
        const DBConnection = await Connection.getInstance();
        if (DBConnection) {
        console.log(`Listening on http://localhost:${app.get('port')}`);
        console.log('Connected to Database');
        }
    }
    catch (error) {
        process.exit(0);
    }
});