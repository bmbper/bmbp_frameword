use bmbp_vars::{app_home_url, app_model};
use salvo::prelude::*;

#[handler]
pub async fn root_action(req: &mut Request, resp: &mut Response, depot: &mut Depot) {
    let app_model = app_model();
    if "api".eq_ignore_ascii_case(&app_model) {
        resp.render("welcome to bmbp admin ")
    } else {
        let home_url = app_home_url();
        if home_url.is_empty() {
            resp.render(Redirect::found("/framework.view"))
        } else {
            resp.render(Redirect::found(home_url))
        }
    }
}
