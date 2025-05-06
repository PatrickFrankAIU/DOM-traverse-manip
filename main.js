// jQuery DOM Traversal and Manipulation Demo
// This script demonstrates various jQuery methods for traversing and manipulating the DOM

// Document ready function - runs when the entire document has loaded
$(document).ready(function() {
    
    // Variable to keep track of the currently selected element
    let currentSelection = null;
    
    // ---------- Helper Functions ----------
    
    // Function to highlight an element by adding a class
    function highlightElements(elements) {
        // First, reset all previous highlights
        resetHighlights();
        
        // Add highlight class to all elements in the collection
        elements.addClass("highlight");
        
        // Update the current selection
        currentSelection = elements;
        
        // Display information about the selected elements
        showSelectionInfo(elements);
    }
    
    // Function to reset all highlights
    function resetHighlights() {
        // Remove highlight class from all elements
        $(".family-member").removeClass("highlight");
        
        // Clear the current selection
        currentSelection = null;
    }
    
    // Function to show information about selected elements
    function showSelectionInfo(elements) {
        // Check if any elements were selected
        if (elements.length === 0) {
            $("#selectedElements").text("No elements found with this traversal method.");
            return;
        }
        
        // Create a result string showing IDs of selected elements
        let resultText = "Selected " + elements.length + " element(s): ";
        
        // Loop through each element and get its ID
        elements.each(function(index) {
            // Get the element ID or a default text if no ID
            let elementId = $(this).attr("id") || "unnamed-element";
            
            // Add the ID to the result text with a comma if not the first element
            if (index > 0) {
                resultText = resultText + ", ";
            }
            resultText = resultText + elementId;
        });
        
        // Update the results display
        $("#selectedElements").text(resultText);
    }
    
    // ---------- Traversal Button Handlers ----------
    
    // Find Parent - demonstrates parent() method
    $("#findParent").click(function() {
        // Start from the first child element
        let startElement = $("#firstChild");
        
        // Find its parent element
        let parentElement = startElement.parent();
        
        // Highlight the parent element
        highlightElements(parentElement);
        
        // Add extra info to the results
        $("#selectedElements").append(
            "<br><em>Used: startElement.parent() to find the parent</em>"
        );
    });
    
    // Find Children - demonstrates children() method
    $("#findChildren").click(function() {
        // Start from the parent element
        let startElement = $("#parent");
        
        // Find all its immediate children
        let childElements = startElement.children();
        
        // Highlight the child elements
        highlightElements(childElements);
        
        // Add extra info to the results
        $("#selectedElements").append(
            "<br><em>Used: startElement.children() to find all immediate children</em>"
        );
    });
    
    // Find Siblings - demonstrates siblings() method
    $("#findSiblings").click(function() {
        // Start from the second child element
        let startElement = $("#secondChild");
        
        // Find all its siblings (not including itself)
        let siblingElements = startElement.siblings();
        
        // Highlight the sibling elements
        highlightElements(siblingElements);
        
        // Add extra info to the results
        $("#selectedElements").append(
            "<br><em>Used: startElement.siblings() to find all siblings</em>"
        );
    });
    
    // Find First Child - demonstrates first() method
    $("#findFirst").click(function() {
        // Get all child elements of the parent
        let allChildren = $("#parent").children();
        
        // Find the first child using the first() method
        let firstElement = allChildren.first();
        
        // Highlight the first child
        highlightElements(firstElement);
        
        // Add extra info to the results
        $("#selectedElements").append(
            "<br><em>Used: elements.first() to find the first element in a collection</em>"
        );
    });
    
    // Find Last Child - demonstrates last() method
    $("#findLast").click(function() {
        // Get all child elements of the parent
        let allChildren = $("#parent").children();
        
        // Find the last child using the last() method
        let lastElement = allChildren.last();
        
        // Highlight the last child
        highlightElements(lastElement);
        
        // Add extra info to the results
        $("#selectedElements").append(
            "<br><em>Used: elements.last() to find the last element in a collection</em>"
        );
    });
    
    // Find Ancestors - demonstrates parents() method
    $("#findAncestors").click(function() {
        // Start from a grandchild element
        let startElement = $("#grandchild1");
        
        // Find all its ancestors up to the family tree container
        let ancestorElements = startElement.parents(".family-member");
        
        // Highlight the ancestor elements
        highlightElements(ancestorElements);
        
        // Add extra info to the results
        $("#selectedElements").append(
            "<br><em>Used: startElement.parents() to find all ancestors</em>"
        );
    });
    
    // Find Descendants - demonstrates find() method
    $("#findDescendants").click(function() {
        // Start from the parent element
        let startElement = $("#parent");
        
        // Find all its descendants (children, grandchildren, etc.)
        let descendantElements = startElement.find(".family-member");
        
        // Highlight the descendant elements
        highlightElements(descendantElements);
        
        // Add extra info to the results
        $("#selectedElements").append(
            "<br><em>Used: startElement.find() to find all descendants matching a selector</em>"
        );
    });
    
    // Reset All - removes all highlights
    $("#resetAll").click(function() {
        // Reset all highlights
        resetHighlights();
        
        // Update the results display
        $("#selectedElements").text("All highlights cleared. Click a button above to see jQuery traversal in action.");
    });
    
    // ---------- Manipulation Button Handlers ----------
    
    // Add Element - demonstrates append() method
    $("#addElement").click(function() {
        // Create a counter to make each new element unique
        if (!window.addCounter) {
            window.addCounter = 1;
        } else {
            window.addCounter++;
        }
        
        // Create a new element
        let newElement = $("<div></div>")
            .attr("id", "newElement" + window.addCounter)
            .addClass("family-member")
            .html("<span class='name'>New Element " + window.addCounter + "</span>");
        
        // Append the new element to the third child
        $("#thirdChild").append(newElement);
        
        // Highlight the new element
        highlightElements(newElement);
        
        // Update the results display
        $("#selectedElements").text("Added and selected: newElement" + window.addCounter);
        $("#selectedElements").append(
            "<br><em>Used: targetElement.append(newElement) to add a new element as a child</em>"
        );
    });
    
    // Remove Element - demonstrates remove() method
    $("#removeElement").click(function() {
        // Check if we have any new elements
        let newElements = $("[id^='newElement']");
        
        if (newElements.length > 0) {
            // Store the ID for the message
            let removedId = newElements.last().attr("id");
            
            // Remove the last added new element
            newElements.last().remove();
            
            // Update the results display
            $("#selectedElements").text("Removed element: " + removedId);
            $("#selectedElements").append(
                "<br><em>Used: element.remove() to remove an element from the DOM</em>"
            );
        } else {
            // No new elements to remove
            $("#selectedElements").text("No new elements to remove. Add some elements first!");
        }
    });
    
    // Move Element - demonstrates appendTo() method
    $("#moveElement").click(function() {
        // Check if we have a current selection to move
        if (!currentSelection || currentSelection.length === 0) {
            $("#selectedElements").text("No element selected to move. Use a traversal button first to select element(s).");
            return;
        }
        
        // Only move one element at a time
        let elementToMove = currentSelection.first();
        
        // Choose a target to move to (toggling between first and second child)
        let currentParent = elementToMove.parent().attr("id");
        let targetParent;
        
        if (currentParent === "firstChild") {
            targetParent = $("#secondChild");
        } else {
            targetParent = $("#firstChild");
        }
        
        // Move the element to the new parent
        elementToMove.appendTo(targetParent);
        
        // Highlight the moved element
        highlightElements(elementToMove);
        
        // Update the results display
        $("#selectedElements").text("Moved element: " + elementToMove.attr("id") + " to " + targetParent.attr("id"));
        $("#selectedElements").append(
            "<br><em>Used: element.appendTo(target) to move an element to a new parent</em>"
        );
    });
    
    // Clone Element - demonstrates clone() method
    $("#cloneElement").click(function() {
        // Check if we have a current selection to clone
        if (!currentSelection || currentSelection.length === 0) {
            $("#selectedElements").text("No element selected to clone. Use a traversal button first to select element(s).");
            return;
        }
        
        // Only clone one element at a time
        let elementToClone = currentSelection.first();
        
        // Create a counter for the clone ID
        if (!window.cloneCounter) {
            window.cloneCounter = 1;
        } else {
            window.cloneCounter++;
        }
        
        // Clone the element
        let clonedElement = elementToClone.clone();
        
        // Update the clone's ID and text to indicate it's a clone
        let originalId = elementToClone.attr("id");
        let cloneId = originalId + "Clone" + window.cloneCounter;
        
        clonedElement.attr("id", cloneId);
        clonedElement.find(".name").text("Clone of " + originalId);
        
        // Add the clone after the original
        elementToClone.after(clonedElement);
        
        // Highlight the cloned element
        highlightElements(clonedElement);
        
        // Update the results display
        $("#selectedElements").text("Cloned element: " + originalId + " to create " + cloneId);
        $("#selectedElements").append(
            "<br><em>Used: element.clone() to create a copy and element.after() to place it</em>"
        );
    });
    
    // Wrap Element - demonstrates wrap() method
    $("#wrapElement").click(function() {
        // Check if we have a current selection to wrap
        if (!currentSelection || currentSelection.length === 0) {
            $("#selectedElements").text("No element selected to wrap. Use a traversal button first to select element(s).");
            return;
        }
        
        // Only wrap one element at a time
        let elementToWrap = currentSelection.first();
        
        // Create a counter for the wrapper ID
        if (!window.wrapCounter) {
            window.wrapCounter = 1;
        } else {
            window.wrapCounter++;
        }
        
        // Create a wrapper element
        let wrapperId = "wrapper" + window.wrapCounter;
        let wrapperHtml = "<div id='" + wrapperId + "' class='family-member-wrapper'></div>";
        
        // Wrap the element
        elementToWrap.wrap(wrapperHtml);
        
        // Get the new wrapper
        let wrapper = $("#" + wrapperId);
        
        // Highlight the wrapper
        highlightElements(wrapper);
        
        // Update the results display
        $("#selectedElements").text("Wrapped element: " + elementToWrap.attr("id") + " with " + wrapperId);
        $("#selectedElements").append(
            "<br><em>Used: element.wrap(html) to wrap an element with a new container</em>"
        );
    });
    
    // ---------- Add Basic Styling via JS ----------
    
    // Add some styling to make the demo visible
    $("head").append("<style>\
        .family-member { \
            margin: 10px; \
            padding: 10px; \
            border: 1px solid #ccc; \
            background-color: #f9f9f9; \
        } \
        .highlight { \
            border: 2px solid red; \
            background-color: #ffeeee; \
        } \
        .family-member-wrapper { \
            border: 2px dashed blue; \
            padding: this ; \
            margin: 5px; \
            background-color: #eeeeff; \
        } \
        #controls, #manipulationDemo { \
            margin-top: 20px; \
            padding: 10px; \
            border: 1px solid #ddd; \
        } \
        button { \
            margin: 5px; \
            padding: 5px 10px; \
        } \
        #results { \
            margin-top: 20px; \
            padding: 10px; \
            border: 1px solid #ddd; \
            background-color: #f5f5f5; \
        } \
    </style>");
});