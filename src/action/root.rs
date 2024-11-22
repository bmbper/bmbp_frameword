use bmbp_vars::app_model;
use salvo::prelude::*;
use tera::ast::Node::Text;

#[handler]
pub async fn root_action(req: &mut Request, resp: &mut Response, depot: &mut Depot) {
    let app_model = app_model();
    if "api".eq_ignore_ascii_case(&app_model) {
        resp.render("welcome ")
    }
}
