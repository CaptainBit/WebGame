package Services;



import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import SQLGun.Type;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;
/**
 * REST Web Service
 *
 * @author admin
 */
@Path("Guns")
public class GunService {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public GunService() {
    }

    
    @GET
    @Path("Type")
    @Produces(MediaType.APPLICATION_JSON)
    public String getType() {
    
        Type gun = new Type();
        
        JSONArray json = gun.getAllTypes();
        
        return json.toString();
    }

}