console.log("MAM Repl");
import Koa from "koa";

const APP = new Koa();

const PORT = process.env.PORT || 3000;

APP.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
