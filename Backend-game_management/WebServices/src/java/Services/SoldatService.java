package Services;



import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import SQLTerritoire.Territoire;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;
/**
 * REST Web Service
 *
 * @author admin
 */
@Path("Territoire")
public class TerritoireService {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public TerritoireService() {
    }

    
    @GET
    @Path("All")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAll() {
    
        Territoire territoire = new Territoire();
        
        JSONArray json = territoire.getAllTerritoire();
        
        return json.toString();
    }

}