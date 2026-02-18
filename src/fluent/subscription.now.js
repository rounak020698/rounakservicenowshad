import "@servicenow/glide";

export default {
  searchUsers: async (request) => {
    const { query } = request.body;
    const gr = new GlideRecord("sys_user");
    gr.addQuery("name", "CONTAINS", query);
    gr.setLimit(10);
    gr.query();
    
    const results = [];
    while (gr.next()) {
      results.push({
        sys_id: gr.getValue("sys_id"),
        name: gr.getValue("name")
      });
    }
    return results;
  },

  searchTemplates: async (request) => {
    const { query } = request.body;
    const gr = new GlideRecord("sys_template");
    gr.addQuery("name", "CONTAINS", query);
    gr.setLimit(10);
    gr.query();
    
    const results = [];
    while (gr.next()) {
      results.push({
        sys_id: gr.getValue("sys_id"),
        name: gr.getValue("name")
      });
    }
    return results;
  },

  create: async (request) => {
    const { user, template } = request.body;
    const gr = new GlideRecord("sys_notif_subscription");
    gr.initialize();
    gr.setValue("user", user);
    gr.setValue("u_description", template);
    const sysId = gr.insert();
    return { success: !!sysId, sysId };
  }
};
