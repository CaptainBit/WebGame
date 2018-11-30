package Services;



import SQLArmure.*;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import SQLArmure.Type;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;
/**
 * REST Web Service
 *
 * @author admin
 */
@Path("Armure")
public class ArmureService {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public ArmureService() {
    }

    
    @GET
    @Path("Type")
    @Produces(MediaType.APPLICATION_JSON)
    public String getType() {
    
        Type armure = new Type();
        
        JSONArray json = armure.getAllTypes();
        
        return json.toString();
    }
    
    @GET
    @Path("ArmurePlayer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getArmurePlayer(@QueryParam("userName") String userName) {
    
        Armure gun = new Armure();
        
        JSONArray json = gun.getArmurePlayer(userName);
        
        return json.toString();
    }

}