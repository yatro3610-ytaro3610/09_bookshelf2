import express from 'express';
import './helpers/db.mjs';
import apiRoutes from './api-routes/index.mjs';
import path from 'path';
//import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('build'));
app.use(express.json());

// app.use(cors({
//     origin: "http://localhost:3000",
// }));

// API
app.use('/api', apiRoutes);

app.get('*', function(req, res){
    const indexHtml = path.resolve('build', 'index.html');
    res.sendFile(indexHtml);
})

app.use(function(req, res) {
    res.status(404).json({ msg: "Page not found."});
});

app.use(function(err, req, res, next){
    if (res.headersSent){
        return next(err);
    }
    res.status(500).json({ msg: '不正なエラーが発生しました'});
});


app.listen(port, () => {
    console.log(`Server Start: http://localhost:${port}`);

});