# Week 1 Log

## Day 1 - Thursday 9.3.26

What worked:Things worked well when I could develop a rhythem. Once Ii gained a little comfort in the program. I caught my own placeholder-email mistake and just reran the command; I was also able to update the mistakes without much guidance. It took about two hours. Once I got into a rhythem winget installed all four tools in one pass with verified hashes.

What confused me: I was using a new system with winget and was extremely cautious. Realized you can't copy and paste over words in "" and it just adds it to the back and doesn't update.Never used that system before. Was out of my element. I had trouble with settings and could not find the same place using ctrl-shift-p. Relied heavily on Claude. GitHub was rate-limited and I couldn't sign up- copied mistake and asked Claude. I think it was the fact that I had winget still open but could be wrong. the VS Code sign-in prompt was actually Copilot, not a login, I would have likely used google sign-in if claude hadn't stopped me- cutiously took a screenshot-most times would have probably getten it wrong; User vs Workspace settings tabs; the save dialog pre-filled the filename from my heading and I ended up with a .yaml file. I thought i did it right, but claude remarked on my screen shot. I still don't know what it was talking about when it mentioned a dot and not saved.

GitHub rate limit cleared on its own after a few hours. Turned out to be the ISP's shared address, not anything on my machine or any program I had open. Signed up successfully around 2pm.

## Day 2 - Friday 9.4.26

Finished the whole Postman API Beginner path, all 7 courses. Went back to it after telling Claude it was too textbook-heavy. First 3 chapters are reading. It turns hands-on at Chapter 5 (Your First Project) and stays that way. 

Built a mock API with GET, POST, PUT, DELETE. All four tests passing. Two 404s, both unfilled path variables. Step 2 of Expand Your Project has written instructions that contradict its own screenshot - :id vs {{taskId}}, and baseURL vs baseUrl. 

Their screenshot even shows the undefined-variable
error. Docs were wrong, not me. Dashed box around a variable = undefined. Solid = resolved.

What I'd tell someone starting this path: Chapter 1 was worth doing and taught you about APIs though reading intensive. Chapter 2 & 4 seemed tedius with limited value primarily saying why postman is great. Chapter 3 started out good by providing click videos where they would talk about an element and you would have to move your mouse and click on something. This part was genuinely interactive enough to keep me going. Though about half way through it felt like they ran out of time and stopped doing it and it became read heavy again. But the first half of chapter 3 gave me hope that this course could be good. I pushed through chapter 4 after seeing the names of the last tow chapters hoping they would be like the first half of chapter 3 and where. 2 and 4 made it painful- 2 seemed like it was a marketing commercial and 4 also seemed to primarily like a why we are great infomorcial on paper. 1, 3, 5 and 6 are worth doing. Unfortunatly I seemed to spend the most time on 2 and 4 genuinely making me want to quit the learning path.

## Day 3 - Monday 9.7.26

Started by watching out dated video and tried following along, but spent more time trying to find where things moved than actually learning anything video: https://www.youtube.com/watch?v=WXsD0ZgxjRw&t=4597s. Great at explaining API, but after that it became a follow along where all the platforms had changed where items are located. Moved on and Built two n8n workflows and pushed everything to GitHub. WEATHER FETCH: rebuilt my Postman Open-Meteo call in n8n. Response was identical - same fields, same values, same timestamp. Different tool, same API. Moved the query string out of the URL into named parameter fields, then used Edit Fields to pull just temperature_2m into one value.

## Day 4 - Wednesday 9.9.26
Started by watching Learn JSON - Full Crash Course for Beginner at https://www.youtube.com/watch?v=GpOO5iKzOmY. Then Claude began having me apply it to n8n. JSON DRILLS: fetched 10 users from jsonplaceholder. Item count through five
nodes:
  HTTP Request  10   fetched the list
  Edit Fields   10   trimmed each item to 3 fields
  Filter         3   removed 7 items
  Sort           3   reordered, count unchanged
  Aggregate      1   packed 3 into 1, nothing lost

{ } = one thing, ask by name with a dot
[ ] = many things, ask by number with a bracket
$json = the current item - n8n already opened the outer list for me Counting starts at 0

A wrong field name doesn't error, it just returns the wrong thing. The grey preview under the expression box shows the real value before running. 
contains matches anywhere in the string - always ask what ELSE would match. Sort can only order by a field that exists.
To sort by last name I'd have to create that field first.

GITHUB: finished the Skills exercise - branch, commit, pull request, merge. The instructions never said where to find my own repository. Then connected ai-automation-lab to a real repo and pushed 4 files. git push -u origin main only needed once. Plain git push after that. If I edit a file on github.com, I have to git pull before working locally. Publish is greyed out in n8n because a Manual Trigger has nothing to listen for. That changes in Week 2 with webhooks.