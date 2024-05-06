FROM nginx:latest

# Change Nginx config here...
COPY --from=build /usr/src/app/client_ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]