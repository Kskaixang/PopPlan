package model;
//src/main/java/com/example/demo/model/Event.java

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
 private String title;
 private String description;
}
