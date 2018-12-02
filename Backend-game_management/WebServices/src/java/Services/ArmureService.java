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
    @Path("getArmurePlayer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getArmurePlayer(@QueryParam("userName") String userName) {
    
        Armure armure = new Armure();
        
        JSONArray json = armure.getArmurePlayer(userName);
        
        return json.toString();
    }
    
    @GET
    @Path("DeleteArmure")
    @Produces(MediaType.APPLICATION_JSON)
    public String AddArmure(@QueryParam("idArmure") int idArmure, @QueryParam("idType") int idType, @QueryParam("userName") String userName) {
    
        Armure armure = new Armure();
        
        boolean result = armure.DeleteArmure(idArmure, idType,userName);
        
        return String.valueOf(result);
    }
    
    @GET
    @Path("AddArmure")
    @Produces(MediaType.APPLICATION_JSON)
    public String AddArmure(@QueryParam("userName") String userName, @QueryParam("idType") int idType) {
    
        Armure armure = new Armure();
        
        boolean result = armure.AddArmure(userName, idType);
        
        return String.valueOf(result);
    }

}